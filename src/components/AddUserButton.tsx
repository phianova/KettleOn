"use client"
import React, {FC} from 'react'

interface AddUserProps {
    currentUser: string | null | undefined,
    role: string | null | undefined,
    organisation: string | null | undefined
}
const AddUserButton: FC<AddUserProps> = (props: AddUserProps) => {

    async function getAccessToken() {
        const url = 'https://kettleon.kinde.com/oauth2/token';
        const clientId = process.env.KINDE_CLIENT_M2M_ID
        const clientSecret = process.env.KINDE_CLIENT_M2M_SECRET
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: `${clientId}`,
                client_secret: `${clientSecret}`,
                audience: 'http://localhost:3000'
            })
        };
    
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data)
        console.log("token", data.access_token)
        return data.access_token;
    }

    const addUser = async (e : any) => {
    e.preventDefault();

    const accessToken = await getAccessToken()

    const inputBody = `{
        "profile": {
          "given_name": ${e.target.given_name.value},
          "family_name": ${e.target.family_name.value},
        },
        "organization_code": ${props.organisation},
        "identities": [
          {
            "type": "email",
            "details": {
              "email": ${e.target.email.value}
            }
          }
        ]
      }`;

      const headers = {
        'Content-Type':'application/json',
        'Accept':'application/json',
        'Authorization':`Bearer ${accessToken}`,
        'Access-Control-Allow-Origin':'https://kettleon.kinde.com'
      };
      
      await fetch('https://kettleon.kinde.com/api/v1/user',
      {
        method: 'POST',
        body: inputBody,
        headers: headers
      })
      .then(function(res) {
          return res.json();
      }).then(function(body) {
          console.log(body);
      });

    //   await fetch("/api/trpc/addUser")
    //   .then(function(res) {
    //       return res.json();
    //   }).then(function(body) {
    //       console.log(body);
    //   });
      
    }





  return (
    <form onSubmit={addUser}>
    <label>First name:</label>
    <input name="given_name" type="text" placeholder="Enter first name"/>
    <label>Surname:</label>
    <input name="family_name" type="text" placeholder="Enter surname"/>
    <label>Email:</label>
    <input name="email" type="email" placeholder="Enter email"/>
    <button type="submit">Add new user</button>
    </form>
  )
}

export default AddUserButton