import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import blogPosts from '../data/blogPosts'
import useFadeUp from '../hooks/useFadeUp'
import './Blog.css'

export default function Blog() {
  useFadeUp()

  return (
    <>
      <Navbar />
      <section className="blog-hero">
        <div className="container blog-hero__content">
          <h1 className="blog-hero__title">Our Blog</h1>
          <p className="blog-hero__sub">
            Lawn care tips, seasonal guides, and updates from the crew.
          </p>
        </div>
      </section>

      <section className="blog-index fade-up">
        <div className="container">
          <div className="blog-index__grid">
            {blogPosts.map((post) => (
              <Link
                to={`/blog/${post.slug}`}
                key={post.slug}
                className="blog-card stagger-child"
              >
                <div className="blog-card__img">
                  <img src={post.image} alt={post.title} loading="lazy" />
                </div>
                <div className="blog-card__body">
                  <span className="blog-card__cat">{post.category}</span>
                  <h3 className="blog-card__title">{post.title}</h3>
                  <p className="blog-card__excerpt">{post.excerpt}</p>
                  <div className="blog-card__meta">
                    <span className="blog-card__date">{post.date}</span>
                    <span className="blog-card__link">Read More →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
