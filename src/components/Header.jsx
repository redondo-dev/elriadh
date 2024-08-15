import React from 'react';


const Header = () => {
    return (
      
 <header id="#top">
   
  <nav className="main-navigation navbar navbar-expand-lg navbar-light">
  <a className="navbar-brand" href="index.html">
        <img
          className="logo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1-bME80_zMAocNp15c4w1fZbNJ4lewtJt4A&usqp=CAU"
          alt="logo"
        />
      </a>
    <div className="container">
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/tafsir">
              كتب التفسير
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/hadith">
              كتب الحديث
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/videos">
              نفحات ايمانية</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="contact.html">
              القراء
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" href="/home">
              {" "}
              الصفحة الرئيسية
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</header>
        
    );
}

export default Header;




