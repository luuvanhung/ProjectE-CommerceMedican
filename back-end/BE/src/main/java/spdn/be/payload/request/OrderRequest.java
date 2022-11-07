package spdn.be.payload.request;

public class OrderRequest {
    private Long shippingAddress;
    private Long billingAddress;

    public OrderRequest() {
    }

    public Long getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(Long shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public Long getBillingAddress() {
        return billingAddress;
    }

    public void setBillingAddress(Long billingAddress) {
        this.billingAddress = billingAddress;
    }
}
