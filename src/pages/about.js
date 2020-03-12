import React, { Component } from "react";

export default class About extends Component {
  componentDidMount() {
    document.title = "About | Sober Buddy";
  }

  render() {
    return (
      <div id={"content"}>
        <h1>Who We Are</h1>
        <p>
          Our philosophy is simple and straightforward. Sober Buddy is committed
          to giving each member sufficient resources which encourages recovery
          and a positive outlook. The keystone to committing to recovery is
          integrity. It is our belief of providing a sobriety companion that can
          be accessed at any time- whether it be on your phone, laptop, iPad,
          etc- means that you will never have to struggle alone.
        </p>
        <p>
          We're a software development team composed of freshman and sophomore
          undergraduate students in the College of Computing and Informatics at
          Drexel University.
        </p>
        <p>
          Substance abuse is commonly seen among college students and young
          adults. The accessibility of addictive substances and the normalized
          societal views on the habit trivialize the seriousness of this
          dependency.
        </p>
        <p>
          As a result, our team initially invented this product design for
          college students/young adults. For example, those who may be too young
          to relate to discussions in local AA meetings, don't have substance
          abuse resources near them, or don't have time due to academics or a
          job. We further perfected the design to create a universal platform
          for all ages and backgrounds. The only requirement is to be
          respectful!
        </p>
        <p>
          Please feel free to send us your feedback and comments about your
          experience with our website under the "Support" tab. It helps to
          ensure that we are upholding our commitment of helpful and quality
          services to help you take steps towards sobriety.
        </p>
        <p>Engineered and Designed in Philadelphia, PA</p>
      </div>
    );
  }
}
