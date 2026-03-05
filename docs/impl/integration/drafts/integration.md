# Integration with Stablecoin Stack

### 1. Introduction:
Some introductory text here.
 
 ###
 
### 1.  Integration paths:

The `Stablecoin Stack Fondation` is commited to doing it's best effort to provide plugins, so you can esily integrate with the most utilized ecommerce platforms. We welcome and thank the commuity for it's contribution's on this endeavour. 

You can also integrate by using our SDK or by running the REST Api client locally and letting your ecommerce execute api calls locally agains it.

|Integration method | Description                                                      |
| ------------------ | ---------------------------------------------------------- |
|Local Rest Client   | Run the `Checkout Engine Client` on your secured environment and make API calls agains it. The `Checkout Engine Client` bridges the communication with the `Checkout Engine`. It encapsulates the mTLS and Open ID connect logic so you can need to spend time on those. The client can be ran natively or in a container. |
|SDK Integration|You can also integrate by adding the SDK libraries to your project. However, this method requires more work and more advanced configuration (SSL, OpenID Connect, etc) |
|Pluins|If your ecommerce is ran on top of known platform, chances are that our community of contributors already built a plugin for that platform and you can just use it rightaway!|

> The method recomended by the `Stablecoin Stack Foundation` is to run the REST client using a Docker and perform API calls againt it. That avois the need of dealing with configurations directly, which can be a have work.


The inegration process depend on what platform the merchant's shop/ecommerce runs (MedusaJs, Wordpress/Woocommerce, Shopify, Joomla, etc...). 

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



 

