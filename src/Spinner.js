import React, { useEffect, useState } from "react";
import "./Spinner.css";

export default function LoadingSpinner() {
    const [isLoading, setIsLoading] = useState(false);
    const handleFetch = () => {
        setIsLoading(true);
        fetch("https://reqres.in/api/users?page=0")
          .then((respose) => respose.json())
          .then((respose) => {
            setIsLoading(false)
         });
     };
  return (
    <div className="spinner-container">

    </div>
  );
}