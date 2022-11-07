package spdn.be.payload.response;

import java.util.List;

public class OrderDetails {
    private Long orderId;
    private String orderStatus;
    private double orderAmount;
    private AddressResponse shippingAddress;
    private AddressResponse billingAddress;
    private List<CartItemDetails> cartItemDetailsList;

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public double getOrderAmount() {
        return orderAmount;
    }

    public void setOrderAmount(double orderAmount) {
        this.orderAmount = orderAmount;
    }

    public AddressResponse getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(AddressResponse shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public AddressResponse getBillingAddress() {
        return billingAddress;
    }

    public void setBillingAddress(AddressResponse billingAddress) {
        this.billingAddress = billingAddress;
    }

    public List<CartItemDetails> getCartItemDetailsList() {
        return cartItemDetailsList;
    }

    public void setCartItemDetailsList(List<CartItemDetails> cartItemDetailsList) {
        this.cartItemDetailsList = cartItemDetailsList;
    }

}
