package spdn.be.sercurity.services;

import spdn.be.entity.Address;
import spdn.be.entity.Cart;
import spdn.be.entity.Order;
import spdn.be.payload.request.OrderRequest;
import spdn.be.payload.response.OrderDetails;
import spdn.be.payload.response.OrderResponse;

import java.util.List;

public interface OrderService {
    OrderResponse createOrder(Long id, OrderRequest orderRequestModel);
    List<OrderDetails> findAllOrders(Long id);
    OrderDetails getOrderById(Long id,Long orderId);
    OrderResponse updateStatus(Long orderId, String status);
    List<OrderDetails> findOrderByStatus(Long userId, String status);
    Order cancelOrder(Long orderId,  Long userId);
    Address findAddressById(Long shippingAddress);
    Cart findCartByUserId(Long userId);
}
