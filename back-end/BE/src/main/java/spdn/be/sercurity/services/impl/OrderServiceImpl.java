package spdn.be.sercurity.services.impl;

import lombok.ToString;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import spdn.be.entity.*;
import spdn.be.exception.ErrorMessages;
import spdn.be.exception.RequestException;
import spdn.be.payload.request.OrderRequest;
import spdn.be.payload.response.AddressResponse;
import spdn.be.payload.response.CartItemDetails;
import spdn.be.payload.response.OrderDetails;
import spdn.be.payload.response.OrderResponse;
import spdn.be.repository.AddressRepository;
import spdn.be.repository.CartRepository;
import spdn.be.repository.OrderRepository;
import spdn.be.repository.ProductRepository;
import spdn.be.sercurity.services.OrderService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    AddressRepository addressRepository;

    @Autowired
    CartRepository cartRepository;

    @Override
    public OrderResponse createOrder(Long id, OrderRequest orderRequestModel) {
        Cart cartEntity = findCartByUserId(id);

        if (cartEntity.getCartItemList().isEmpty())
            throw new RequestException(ErrorMessages.EMPTY_CART.getErrorMessages());

        for (CartItem cartItemEntity : cartEntity.getCartItemList()) {
            if (cartItemEntity.getProduct().getQuantity() < cartItemEntity.getQuantity()) {
                throw new RequestException(ErrorMessages.OUT_OF_STOCK.getErrorMessages());
            }
        }

        Address shippingEntity = findAddressById(orderRequestModel.getShippingAddress());
        Address billingEntity = findAddressById(orderRequestModel.getBillingAddress());

        if ((shippingEntity.getUser().getId() != id) || (billingEntity.getUser().getId() != id))
            throw new RequestException(ErrorMessages.INVALID_USER_ADDRESS.getErrorMessages());

        Order orderEntity = new Order();
        orderEntity.setShippingAddress(shippingEntity);
        orderEntity.setBillingAddress(billingEntity);
        orderEntity.setOrderStatus("confirmed");

        orderEntity.setOrderAmount(cartEntity.getTotalAmount());

        cartEntity.setCartStatus("closed");
        Cart storedCartEntity = cartRepository.save(cartEntity);

        orderEntity.setCartEntity(storedCartEntity);

        Order storedEntity = orderRepository.save(orderEntity);

        for (CartItem cartItemEntity : storedEntity.getCartEntity().getCartItemList()) {
            Product productEntity = productRepository.findByProductId(cartItemEntity.getProduct().getProductId());
            productEntity.setQuantity((productEntity.getQuantity()) - (cartItemEntity.getQuantity()));
            productRepository.save(productEntity);
        }


        OrderResponse orderResponsemodel = new OrderResponse();
        BeanUtils.copyProperties(storedEntity, orderResponsemodel);

        AddressResponse addressResponseModel = new AddressResponse();
        BeanUtils.copyProperties(storedEntity.getShippingAddress(), addressResponseModel);
        orderResponsemodel.setShippingAddress(addressResponseModel);
        return orderResponsemodel;
    }

    @Override
    public List<OrderDetails> findAllOrders(Long id) {
        List<Cart> cartEntityList = cartRepository.findByUserIdAndStatus(id, "closed");

        if (cartEntityList.isEmpty())
            throw new RequestException(ErrorMessages.NO_ORDER_FOUND.getErrorMessages());

        List<OrderDetails> orderDetailsModels = new ArrayList<OrderDetails>();
        for (Cart cartEntity : cartEntityList) {
            Order orderEntity = orderRepository.findByCartId(cartEntity.getCartId());
            OrderDetails orderDetailsModel = new OrderDetails();
            BeanUtils.copyProperties(orderEntity, orderDetailsModel);

            List<CartItemDetails> cartItemDetails = new ArrayList<CartItemDetails>();
            for (CartItem cartItemEntity : orderEntity.getCartEntity().getCartItemList()) {
                CartItemDetails cartItemDetail = new CartItemDetails();
                cartItemDetail.setProductName(cartItemEntity.getProduct().getProductName());
                cartItemDetail.setQuantity(cartItemEntity.getQuantity());
                cartItemDetail.setTotalPrice(cartItemEntity.getTotalPrice());
                cartItemDetails.add(cartItemDetail);
            }
            orderDetailsModel.setCartItemDetailsList(cartItemDetails);

            AddressResponse billingAddress = new AddressResponse();
            BeanUtils.copyProperties(orderEntity.getBillingAddress(), billingAddress);
            orderDetailsModel.setBillingAddress(billingAddress);

            AddressResponse shippingAddress = new AddressResponse();
            BeanUtils.copyProperties(orderEntity.getShippingAddress(), shippingAddress);
            orderDetailsModel.setShippingAddress(shippingAddress);

            orderDetailsModels.add(orderDetailsModel);
        }

        return orderDetailsModels;
    }

    @Override
    public OrderDetails getOrderById(Long id, Long orderId) {
        Optional<Order> orderEntity = orderRepository.findByOrderId(id);
        if (orderEntity == null )
            throw new RequestException(ErrorMessages.INVALID_ORDERID.getErrorMessages());
        if (orderEntity.get().getCartEntity().getUser().getId() != id)
            throw new RequestException(ErrorMessages.INVALID_USER_ORDER.getErrorMessages());

        OrderDetails orderDetailsModel = new OrderDetails();
        BeanUtils.copyProperties(orderEntity.get(), orderDetailsModel);

        List<CartItemDetails> cartItemDetails = new ArrayList<CartItemDetails>();
        for (CartItem cartItemEntity : orderEntity.get().getCartEntity().getCartItemList()) {
            CartItemDetails cartItemDetail = new CartItemDetails();
            cartItemDetail.setProductName(cartItemEntity.getProduct().getProductName());
            cartItemDetail.setQuantity(cartItemEntity.getQuantity());
            cartItemDetail.setTotalPrice(cartItemEntity.getTotalPrice());
            cartItemDetails.add(cartItemDetail);
        }
        orderDetailsModel.setCartItemDetailsList(cartItemDetails);

        AddressResponse billingAddress = new AddressResponse();
        BeanUtils.copyProperties(orderEntity.get().getBillingAddress(), billingAddress);
        orderDetailsModel.setBillingAddress(billingAddress);

        AddressResponse shippingAddress = new AddressResponse();
        BeanUtils.copyProperties(orderEntity.get().getShippingAddress(), shippingAddress);
        orderDetailsModel.setShippingAddress(shippingAddress);

        return orderDetailsModel;
    }

    @Override
    public OrderResponse updateStatus(Long orderId, String status) {
        String status1 = status.toLowerCase();
        if (!status1.equals("confirmed") && !status1.equals("shipped") && !status1.equals("in-transit") && !status1.equals("delivered") && !status1.equals("cancelled"))
            throw new RequestException(ErrorMessages.INVALID_STATUS.getErrorMessages());

        OrderResponse orderResponsemodel = new OrderResponse();

        Optional<Order> orderEntity = orderRepository.findByOrderId(orderId);
        if (orderEntity == null )
            throw new RequestException(ErrorMessages.INVALID_ORDERID.getErrorMessages());
        if (orderEntity.get().getOrderStatus().equals(status1))
            throw new RequestException(ErrorMessages.SAME_STATUS.getErrorMessages());

        Order orderEntity1 = orderEntity.get();
        orderEntity1.setOrderStatus(status1);

        Order orderEntity2 = orderRepository.save(orderEntity1);


        BeanUtils.copyProperties(orderEntity2, orderResponsemodel);

        AddressResponse addressResponseModel = new AddressResponse();
        BeanUtils.copyProperties(orderEntity2.getShippingAddress(), addressResponseModel);
        orderResponsemodel.setShippingAddress(addressResponseModel);
        return orderResponsemodel;
    }

    @Override
    public List<OrderDetails> findOrderByStatus(Long userId, String status) {
        String status1 = status.toLowerCase();

        if (!status1.equals("confirmed") && !status1.equals("shipped") && !status1.equals("in-transit") && !status1.equals("delivered") && !status1.equals("cancelled"))
            throw new RequestException(ErrorMessages.INVALID_STATUS.getErrorMessages());

        List<OrderDetails> orderDetailsModels = new ArrayList<OrderDetails>();
        List<Cart> cartEntityList = cartRepository.findByUserIdAndStatus(userId, "closed");

        if (cartEntityList.isEmpty())
            throw new RequestException(ErrorMessages.NO_ORDER_FOUND.getErrorMessages());

        boolean orderfound = false;
        for (Cart cartEntity : cartEntityList) {
            Order orderEntity = orderRepository.findBycartIdandStatus(cartEntity.getCartId(), status1);
            if (orderEntity != null) {
                orderfound = true;
                OrderDetails orderDetailsModel = new OrderDetails();
                BeanUtils.copyProperties(orderEntity, orderDetailsModel);

                List<CartItemDetails> cartItemDetails = new ArrayList<CartItemDetails>();
                for (CartItem cartItemEntity : orderEntity.getCartEntity().getCartItemList()) {
                    CartItemDetails cartItemDetail = new CartItemDetails();
                    cartItemDetail.setProductName(cartItemEntity.getProduct().getProductName());
                    cartItemDetail.setQuantity(cartItemEntity.getQuantity());
                    cartItemDetail.setTotalPrice(cartItemEntity.getTotalPrice());
                    cartItemDetails.add(cartItemDetail);
                }
                orderDetailsModel.setCartItemDetailsList(cartItemDetails);

                AddressResponse billingAddress = new AddressResponse();
                BeanUtils.copyProperties(orderEntity.getBillingAddress(), billingAddress);
                orderDetailsModel.setBillingAddress(billingAddress);

                AddressResponse shippingAddress = new AddressResponse();
                BeanUtils.copyProperties(orderEntity.getShippingAddress(), shippingAddress);
                orderDetailsModel.setShippingAddress(shippingAddress);

                orderDetailsModels.add(orderDetailsModel);
            }

        }
        if (!orderfound)
            throw new RequestException(ErrorMessages.NO_ORDER_STATUS.getErrorMessages());
        return orderDetailsModels;
    }

    @Override
    public Order cancelOrder(Long orderId, Long userId) {
        Optional<Order> orderEntity = orderRepository.findByOrderId(orderId);
        if (orderEntity == null)
            throw new RequestException(ErrorMessages.INVALID_ORDERID.getErrorMessages());
        if (orderEntity.get().getCartEntity().getUser().getId() != userId)
            throw new RequestException(ErrorMessages.INVALID_USER_ORDER.getErrorMessages());
        if (orderEntity.get().getOrderStatus().equals("cancelled"))
            throw new RequestException(ErrorMessages.ALREADY_CANCELLED.getErrorMessages());
        if (orderEntity.get().getOrderStatus().equals("delivered") ||
                orderEntity.get().getOrderStatus().equals("in-transit"))
            throw new RequestException(ErrorMessages.CANCEL_REJECTED.getErrorMessages());

        Order orderEntity1 = orderEntity.get();
        orderEntity1.setOrderStatus("cancelled");
        Order cancelledOrder = orderRepository.save(orderEntity1);

        for (CartItem cartItemEntity : orderEntity1.getCartEntity().getCartItemList()) {
            Product productEntity = productRepository.findByProductId(cartItemEntity.getProduct().getProductId());
            productEntity.setQuantity(productEntity.getQuantity() + cartItemEntity.getQuantity());
            productRepository.save(productEntity);
        }


        return cancelledOrder;
    }

    @Override
    public Address findAddressById(Long shippingAddress) {
        Optional<Address> addressEntity = addressRepository.findByAddressId(shippingAddress);

        if (addressEntity == null   ) {
            throw new RequestException(ErrorMessages.INVALID_ADDRESS.getErrorMessages());
        }

        return addressEntity.get();
    }

    @Override
    public Cart findCartByUserId(Long userId) {
            Optional<Cart> cartEntity = cartRepository.findByUserId(userId, "open");
        System.out.println(cartEntity);
        if (cartEntity == null) {
            throw new RequestException(ErrorMessages.CART_ALREADY_CHECKED_OUT.getErrorMessages());
        }
        return cartEntity.get();
    }
}
