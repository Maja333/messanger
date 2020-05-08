import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import "./CookiesAllert.scss";

const CookiesAllert = () => {
    const [close, setClose] = useState(false);

    const cookies = new Cookies();

  const x = () => {
    cookies.set("close", true, { path: "/" });
    setClose(true);
  };

  useEffect(()=>{
    const checkCookie = cookies.get("close");
    if (checkCookie !== undefined) {
      setClose(true);
    }
  },[])

  return close === false ? (
    <div className="allertCenter">
      <div className="CookiesAllert">
        <button className="btn" onClick={x}>x</button>
        <h3 className="text title">Strona wykorzystuje pliki cookie</h3>
        <p className="text">
          Ta strona korzysta z informacji zapisanych za pomocą plików cookies,
          aby świadczyć usługi na najwyzszym poziomie. <br></br>
          Dalsze korzystanie ze strony oznacza, ze zgadzasz się na ich uycie.
        </p>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default CookiesAllert;
