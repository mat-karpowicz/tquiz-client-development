import React from "react";

function About(props) {
  return (
    <div className="about">
      <h2 className="about-title">ABOUT THIS PROJECT</h2>
      <p>
        Trivia quiz app is a quiz game application that uses trivia API to get
        categories, questions and answers. App lets you play two types of games
        - with multiple answers or true/false. It also can save your progress in
        database. This project was made to self-improve. Client side is running
        as a React application, server as a Node.js with Express framework. You
        can check this and my other projects on my Github. Also come and check
        me out <a href="#asd">here</a>!
      </p>
      <h2 className="about-title">SECURITY</h2>
      <p>
        This project was a chance to get better at security. Passwords are
        hashed with bcrypt and those hashes are saved in MongoDB. When user
        tries to get to secured paths (eg. '/dashboard') application checks if
        user is authenticated and redirects. Authentication is checked with JWT
        (jsonwebtoken) that is send with http-only cookie.
      </p>
      <h2 className="about-title">SERVER</h2>
      <p>
        Server is hosted on Heroku. It is based on Node.js with Express. Server
        routes are divided on two groups: '/auth' and '/trivia'. First group of
        routes are used to handle authentication/authorization requests (eg.
        login, reqgister, checking authentication). The other one is set to
        handle categories, questions and answers requests (eg. fetching all
        available categories, getting questions).
      </p>
      <button className="btn" onClick={props.toggleAbout}>
        Go Back
      </button>
    </div>
  );
}

export default About;
