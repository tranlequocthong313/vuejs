'use strict'

app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: /*html */`
        <div class="product-display">
            <div class="product-container">
                <div class="product-image">
                    <a :href="url">
                        <img :src="image" :alt=product :class='{"out-of-stock-img": !inStock}'>
                    </a>
                </div>
                <div class="product-info">
                    <h1>{{title}}</h1>

                    <p>{{sale}}</p>

                    <h4>Description:</h4>
                    <p>{{description}}</p>

                    <h4>Available:</h4>
                    <p v-if='inStock'>In Stock</p>
                    <p v-else='inStock'>Out of Stock</p>

                    <h4>Shipping:</h4>
                    <p>{{shipping}}</p>

                    <h4>Details:</h4>
                    <product-details :details='details'></product-details>

                    <h4>Variants:</h4>
                    <div v-for='(variant, index) in variants' :key='variant.id' class='color-circle'
                        :style='{backgroundColor: variant.color}' @mouseover='updateVariant(index)'>
                    </div>

                    <h4>Sizes:</h4>
                    <div v-for='size in sizes' :key='size' class='color-circle'>{{size}}</div>

                    <div class="actions">
                        <button class="button" @click='addToCart' :disabled='!addable'
                            :class='{ disabledButton: !addable }'>Add to Cart</button>
                        <button class="button" @click='removeFromCart' >Remove from Cart</button>
                    </div>
                </div>
            </div>

            <review-list :reviews='reviews' v-if='reviews.length > 0'></review-list>
            <review-form @submit-review='addReview'></review-form>
        </div>
    `,
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            description: 'VueJS socks',
            selectedVariant: 0,
            url: 'https://socks.com',
            onSale: true,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { id: 2234, color: 'green', image: `./assets/images/socks_green.jpg`, quantity: 10 },
                { id: 2235, color: 'blue', image: `./assets/images/socks_blue.jpg`, quantity: 0 },
            ],
            sizes: [4, 5, 5.5, 6],
            reviews: [],
        }
    },
    methods: {
        addToCart() {
            if (this.addable) {
                this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
            }
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
        },
        updateVariant(index) {
            this.selectedVariant = index
        },
        addReview(review) {
            console.group(`Review ${new Date()}`)
            console.log(`Email: ${review.email}`)
            console.log(`Review: ${review.review}`)
            console.log(`Rating: ${review.rating}`)
            console.groupEnd()
            this.reviews.push(review)
        }
    },
    computed: {
        title() {
            return `${this.brand} ${this.product}`
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity > 0
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        quantity() {
            return this.variants[this.selectedVariant].quantity
        },
        addable() {
            return this.inStock
        },
        sale() {
            if (this.onSale) {
                return `${this.brand} ${this.product} is on sale`
            }
            return ''
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }
            return 2.99
        },
        includeSize() {
            return
        },
    }
})
