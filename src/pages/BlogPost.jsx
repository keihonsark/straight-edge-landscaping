import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import blogPosts from '../data/blogPosts'
import config from '../config'
import './BlogPost.css'

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="bp-notfound">
          <h1>Post Not Found</h1>
          <Link to="/blog">← Back to Blog</Link>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <section className="bp-hero">
        <img src={post.image} alt={post.title} className="bp-hero__img" />
        <div className="bp-hero__overlay" />
      </section>

      <article className="bp-article">
        <div className="bp-article__header">
          <span className="bp-article__cat">{post.category}</span>
          <span className="bp-article__date">{post.date}</span>
        </div>
        <h1 className="bp-article__title">{post.title}</h1>
        <p className="bp-article__author">By {config.content.blogAuthor}</p>

        <div
          className="bp-article__body"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="bp-article__cta">
          <h2>Ready to get your yard looking this good?</h2>
          <Link to="/estimate" className="bp-article__cta-btn">
            Get a Free Estimate →
          </Link>
        </div>

        <div className="bp-article__back">
          <Link to="/blog">← Back to All Posts</Link>
        </div>
      </article>

      <Footer />
    </>
  )
}
