import LatestBlogImage1 from '../assets/latestblogimage1.jpg';
import LatestBlogImage2 from '../assets/latestblogimage2.jpg';
import LatestBlogImage3 from '../assets/latestblogimage3.jpg';
import LatestBlogImage4 from '../assets/latestblogimage4.jpg';
import LatestBlogImage5 from '../assets/latestblogimage5.jpg';
import LatestBlogImage6 from '../assets/latestblogimage6.jpg';

const BlogPosts = () => {
    return (
        <section id="blog-post-section" className="mt-3">
            <div className="blog-post-div">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center mt-4">
                            <div class="card" style={{width: "36rem"}}>
                                <img src={LatestBlogImage1} class="card-img-top"/>
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" class="btn btn-primary">Continue Reading</a>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center mt-4">
                            <div class="card" style={{width: "36rem"}}>
                                <img src={LatestBlogImage2} class="card-img-top"/>
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" class="btn btn-primary">Continue Reading</a>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center mt-4">
                            <div class="card" style={{width: "36rem"}}>
                                <img src={LatestBlogImage3} class="card-img-top"/>
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" class="btn btn-primary">Continue Reading</a>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center mt-4">
                            <div class="card" style={{width: "36rem"}}>
                                <img src={LatestBlogImage4} class="card-img-top"/>
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" class="btn btn-primary">Continue Reading</a>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center mt-4">
                            <div class="card" style={{width: "36rem"}}>
                                <img src={LatestBlogImage5} class="card-img-top"/>
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" class="btn btn-primary">Continue Reading</a>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center mt-4">
                            <div class="card" style={{width: "36rem"}}>
                                <img src={LatestBlogImage6} class="card-img-top"/>
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" class="btn btn-primary">Continue Reading</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BlogPosts;
