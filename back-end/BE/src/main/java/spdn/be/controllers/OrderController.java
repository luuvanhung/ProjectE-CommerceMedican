package spdn.be.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import spdn.be.payload.request.OrderRequest;
import spdn.be.payload.response.OrderDetails;
import spdn.be.payload.response.OrderResponse;
import spdn.be.sercurity.services.OrderService;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    OrderService orderService;
    @PostMapping("/create-order/{id}")
    public ResponseEntity<OrderResponse> createOrder(@PathVariable Long id
            ,
            @RequestBody OrderRequest orderRequestModel) throws Exception {




        OrderResponse orderResponsemodel = orderService.createOrder(id, orderRequestModel );

        return new ResponseEntity<>(orderResponsemodel, HttpStatus.CREATED);

    }
    @GetMapping("/all/{id}")
    public ResponseEntity<List<OrderDetails>> getLoggedInUserOrders(@PathVariable Long id) {



        List<OrderDetails> orderDetailsModels = orderService.findAllOrders(id);
        if (orderDetailsModels.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(orderDetailsModels, HttpStatus.OK);
        }
    }

    @GetMapping("/all/{id}/{orderId}")
    public ResponseEntity<OrderDetails> getOrder(@PathVariable Long id,@PathVariable Long orderId) {



        OrderDetails orderDetailsModel = orderService.getOrderById(id,orderId);
        return new ResponseEntity<>(orderDetailsModel, HttpStatus.OK);

    }
    @PutMapping("/{orderId}")
    public ResponseEntity<OrderResponse> updateOrderStatus(@PathVariable Long orderId, @RequestParam(value = "status") String status) throws Exception {


        return new ResponseEntity<>(orderService.updateStatus(orderId, status), HttpStatus.ACCEPTED);

    }
    @GetMapping("/{id}")
    public ResponseEntity<List<OrderDetails>> getOrderByStatus(@PathVariable Long id
                                                                   ,@RequestParam(value = "status") String status) {



        List<OrderDetails> orderDetailsModels = orderService.findOrderByStatus(id, status);
        if (orderDetailsModels.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(orderDetailsModels, HttpStatus.OK);
        }
    }
    @DeleteMapping("/cancel/{id}/{orderId}")
    public ResponseEntity<?> cancelOrder(@PathVariable Long id,
                                         @PathVariable Long orderId) throws Exception {




        orderService.cancelOrder(orderId, id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);

    }
}
