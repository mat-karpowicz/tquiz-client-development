import React, { useEffect } from "react";

function Error(props) {
  useEffect(() => {
    document.getElementById("error");
    setTimeout(() => {
      props.setError(false);
    }, 3000);
  }, [props]);

  return (
    <div className="error" id="error">
      <div className="flex flex-jc-c flex-ai-c err-message">
        {props.errorMessage}
      </div>
    </div>
  );
}

export default Error;
