'use strict'

app.component('review-form', {
    template: /*html */ `
        <form class='review-form' @submit.prevent='submitReview'>
            <h3>Leave a review</h3>

            <label for='email'>Email:</label>
            <input id='email' type='email' placeholder='vuejs@gmail.com' v-model='email' required/>

            <label for='review'>Review:</label>
            <textarea id='review' placeholder='Review...' v-model='review' />

            <label for='rating'>Rating:</label>
            <select id='rating' v-model.number='rating' required>
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>

            <label for='recommend'>Would you recommend this product?</label>
            <select id='recommend' v-model='recommend' required>
                <option>Yes</option>
                <option>No</option>
            </select>

            <button class='button form-button'>Submit</button>
        </form>
    `,
    data() {
        return {
            email: '',
            review: '',
            rating: null,
            recommend: null
        }
    },
    methods: {
        submitReview() {
            if (this.email.trim() === '' || this.rating === null || this.recommend === null) {
                alert('Review is incomplete. Please fill out every field.')
                return
            }

            this.$emit('submit-review', {
                email: this.email,
                review: this.review,
                rating: this.rating,
                recommend: this.recommend,
            })

            this.email = ''
            this.review = ''
            this.rating = null
            this.recommend = null
        }
    }
})
