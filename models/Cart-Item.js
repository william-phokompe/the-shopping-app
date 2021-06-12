class CartItem {
    constructor(imageUrl, quantity, productPrice, productTitle, pushToken, sum) {
        this.imageUrl = imageUrl;
        this.quantity = quantity;
        this.productPrice = productPrice;
        this.productTitle = productTitle;
        this.pushToken = pushToken
        this.sum = sum;
    }
}

export default CartItem;