const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const nodemailer = require('nodemailer');
const auth = require('../middleware/auth');

// Configure nodemailer
const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Create new order
router.post('/', async (req, res) => {
  try {
    const {
      customer,
      items,
      subtotal,
      tax,
      total,
      deliveryAddress,
      specialInstructions,
      orderType
    } = req.body;

    // Create order
    const order = new Order({
      customer,
      items,
      subtotal,
      tax,
      total,
      deliveryAddress,
      specialInstructions,
      orderType,
      estimatedDeliveryTime: new Date(Date.now() + 45 * 60 * 1000) // 45 minutes from now
    });

    const savedOrder = await order.save();

    // Send email notification to admin
    const emailHtml = `
      <h2>New Order Received - ${savedOrder.orderNumber}</h2>
      <h3>Customer Information:</h3>
      <p><strong>Name:</strong> ${customer.name}</p>
      <p><strong>Email:</strong> ${customer.email}</p>
      <p><strong>Phone:</strong> ${customer.phone}</p>
      
      <h3>Order Details:</h3>
      <ul>
        ${items.map(item => `
          <li>${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}</li>
        `).join('')}
      </ul>
      
      <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
      <p><strong>Tax:</strong> $${tax.toFixed(2)}</p>
      <p><strong>Total:</strong> $${total.toFixed(2)}</p>
      
      ${deliveryAddress ? `
        <h3>Delivery Address:</h3>
        <p>${deliveryAddress.street}<br>
        ${deliveryAddress.city}, ${deliveryAddress.state} ${deliveryAddress.zipCode}</p>
      ` : ''}
      
      ${specialInstructions ? `
        <h3>Special Instructions:</h3>
        <p>${specialInstructions}</p>
      ` : ''}
      
      <p><strong>Order Type:</strong> ${orderType}</p>
      <p><strong>Order Time:</strong> ${new Date().toLocaleString()}</p>
    `;

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `New Order: ${savedOrder.orderNumber}`,
        html: emailHtml
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the order if email fails
    }

    res.status(201).json({
      message: 'Order placed successfully',
      order: savedOrder
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get all orders (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query = status && status !== 'all' ? { status } : {};
    
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Order.countDocuments(query);
    
    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Update order status (admin only)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// Get dashboard stats (admin only)
router.get('/stats/dashboard', auth, async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    // Today's stats
    const todayOrders = await Order.countDocuments({
      createdAt: { $gte: startOfDay }
    });
    
    const todayRevenue = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfDay }, status: { $ne: 'cancelled' } } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    
    // Monthly stats
    const monthlyOrders = await Order.countDocuments({
      createdAt: { $gte: startOfMonth }
    });
    
    const monthlyRevenue = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfMonth }, status: { $ne: 'cancelled' } } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    
    // Status breakdown
    const statusBreakdown = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    
    // Recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('orderNumber customer.name total status createdAt');
    
    res.json({
      todayOrders,
      todayRevenue: todayRevenue[0]?.total || 0,
      monthlyOrders,
      monthlyRevenue: monthlyRevenue[0]?.total || 0,
      statusBreakdown,
      recentOrders
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

module.exports = router;