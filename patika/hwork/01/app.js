const axios = require('axios').default;
// import axios from "axios";



async function getData(par) {
    const { data: users } = await axios(
        "https://jsonplaceholder.typicode.com/users/" + par
    );
    
    const { data: post } = await axios(
        "https://jsonplaceholder.typicode.com/posts?userId=" + par
    );

    console.log("users", users, post);
    const full = [users, post];
    console.log("nussers" ,full);
}

getData(5);
/*
function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 2000);
    });
  }
  
  async function asyncCall() {
    console.log('calling');
    const result = await resolveAfter2Seconds();
    console.log(result);
    // expected output: "resolved"
  }
  
  asyncCall();*/