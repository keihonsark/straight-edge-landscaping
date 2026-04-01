import { Link } from 'react-router-dom'
import blogPosts from '../data/blogPosts'
import './BlogPreview.css'

export default function BlogPreview() {
  return (
    <section className="blog-preview fade-up">
      <div className="container">
        <p className="blog-preview__eyebrow">From The Team</p>
        <h2 className="blog-preview__heading sh__heading">
          Lawn Care <span className="sh__outline">Tips</span> & Updates
        </h2>
        <div className="sh__line" />

        <div className="blog-preview__grid">
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

        <div className="blog-preview__cta">
          <Link to="/blog" className="blog-preview__btn">
            View All Posts →
          </Link>
        </div>
      </div>
    </section>
  )
}
