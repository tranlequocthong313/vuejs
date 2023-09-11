app.component('review-list', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: /*html */`
        <div class='review-container'>
            <h3>Reviews:</h3>
            <ul>
                <li v-for='(review, index) in reviews' :key='index'>
                    <h4>{{review.email}}</h4>
                    <p>{{review.review}}</p>
                    <p>Rating: {{review.rating}}/5</p>
                    <p>Recommend: {{review.recommend}}</p>
                </li>
            </ul>
        </div>
    `
})
