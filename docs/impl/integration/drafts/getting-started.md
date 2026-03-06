# Getting Started

Some introductory text here.

# 1.0 Getting Started
 
1.  `The Merchant` creates a free account (requires email + password only) with the payment provider and get access to the merchant's dashboard
2. `The Merchant` is rquired to subscribe to a plan. The flow assumes the usual scenario where a the payment processor, acting as a SaaS, has  more then one plan.  
3. If the `The Merchant` selected a free plan, then that plan is activated automatically on creation, otherwise, the plan is created as "pending activation" and will be activated automatically on payment confirmation. 
    
    > Merchants can subscribe to more then one plan if they have more then one business. That would be excpeted to happen for example, when a merchant has more the one website or more the one physical shop.
4. `The Merchant` awaits for the activation of the plan.

5. `The Merchant` creates a `Business` and associates the active plan with it. A  `Business` is an exclusive set of configurations, for example website's name, webhook Url, receiver's wallet address, etc.
    >If a `The Merchant` has more then one shop or ecommerce and they require unique configurations then, `The Merchant` needs to create one `Business`, for each shop/ecommerce. Each  `Business` require one active plan.

5. Once the plan is activated `The Merchant` can issue the `credentials` which are required for the integration. The `credentials` are requested on a click of a button inside the dashboard. They are composed by a username, a password, the SSL Certificate and the CA's certificate. 

6. Having succesfully completed the previous steps, `The Merchant` is now ready to integrate the `Stablecoin Stack` compliant payment processor on their systems.
 ###
# 2.0. Integration with Stablecoin Stack

### 2.1. Integration paths:
|Integration method | Description                                                      |
| ------------------ | ---------------------------------------------------------- |
|Local Rest Client   | Run the `Checkout Engine Client` on your secured environment and make API calls agains it. The `Checkout Engine Client` bridges the communication with `Checkout Engine` and encapsulates the whole logic for mTLS and Open ID connect. The client can be run natively or in a container. |
|SDK Integration|You can also integrate by adding the SDK libraries to your project. Saves you from having to run a separate APP however, it requires more work and more advanced configuration (SSL, OpenID Connect, etc |
|||

> Stablecoin Stack recomends to run the client using the Docker container method. 



The inegration process depend on what platform the merchant's shop/ecommerce runs (MedusaJs, Wordpress/Woocommerce, Shopify, Joomla, etc...). 
> The Stablecoin Stack Fondation is commited to diont it's best effort to provide plugins to the most used ecommerce platforms. We welcome and thank the commuity for it's contribution's on this endeavour. 


###  Local REST client 

1.1. Run the client in a docker container

This is the simplest way to integrate: Run a the `Checkout Engine Client` on a docker container in the


For this reference implementation we are using a generic ecommerce, with a simplistic and minimalist shopping ecommerce website made with  NestJs/Nodejs. We used the `Checkout Engine NodeJs SDK` to communicate with the `checkout engine`. The `Checkout Engine NodeJs SDK` can be found [`Here`](https://github.com/stablecoin-stack/implementation/checkout-engine-sdk).

The integration using the `Checkout Engine NodeJs SDK` is done by extendiing the `CheckoutEngineClient` and passing our inique `configurations` in the constructor. Please notice the following line:

    ```typescript
    super(params, loginProxyUrl, mrchantProfileDto);
    ```

Customer reaches the checkout page in the merchant's website  (or seller does so, on the web POS if physical shop)



merchant's backend calls the `checkout engine` passing them purchased items list and it's locally generated Order Reference (16-bytes / uuid)



 checkout engine generates a charge and answers with a jwt token that i 



 

