import React from "react";
import "./BlogSubTitle.scss";

const BlogSubTitle = () => {
  return (
    <>
      <div className="content-text">
        <h2 className="section-title">What is Software Development?</h2>
        <p className="paragraph">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa tempora
          provident sint earum sunt deserunt magni. Ea, culpa sequi perferendis
          quae natus iste esse vero praesentium saepe consectetur, beatae unde.
        </p>
        {/* Table of Contents */}
        <div className="table-of-contents">
          <h3 className="toc-title">Table of Contents</h3>
          <ul className="toc-list">
            <li>Introduction to Software Development</li>
            <li>How It Works</li>
            <li>Benefits of Software Development</li>
            <li>Conclusion</li>
          </ul>
        </div>
      </div>

      {/* Detailed Content Section */}
      <div className="detailed-content">
        <h3 className="section-title">Introduction to Software Development</h3>
        <p className="paragraph">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere ut
          eaque eius fugiat. Iusto necessitatibus nesciunt neque ipsa quidem
          explicabo illo provident eaque, rem perferendis exercitationem
          doloribus, aspernatur earum sapiente?
        </p>
        <img src="/img/blog/img6.png" alt="Introduction" className="image" />
        <h3 className="section-title">How It Works</h3>
        <p className="paragraph">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam sequi
          earum asperiores commodi tempore deserunt recusandae iste, aut ex
          molestias tenetur ratione fuga dignissimos ducimus nemo possimus!
          Repellendus, ipsum tempora.
        </p>
        <p className="paragraph">
          More details can be added here to elaborate on the workflow and
          processes involved.
        </p>
      </div>

      {/* Conclusion Section */}
      <div className="conclusion">
        <h2 className="section-title">Conclusion</h2>
        <p className="paragraph">
          Software development is a constantly evolving field that blends
          creativity and technical expertise. From understanding the
          requirements to deploying the solution, every phase plays a critical
          role. As technology advances, so do the opportunities in software
          development.
        </p>
      </div>
    </>
  );
};

export default BlogSubTitle;
