package com.example.stripe.controller;

import com.example.stripe.service.StripeService;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private StripeService stripeService;

    @PostMapping("/create")
    public PaymentIntent createPayment(@RequestParam Long amount, @RequestParam String currency) throws Exception {
        return stripeService.createPaymentIntent(amount, currency);
    }
}
