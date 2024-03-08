
const clientId = process.env.NEXT_PUBLIC_KINDE_CLIENT_M2M_ID
const clientSecret = process.env.NEXT_PUBLIC_KINDE_CLIENT_M2M_SECRET

export async function getAccessToken() {
    const url = 'https://kettleon.kinde.com/oauth2/token';
    console.log(clientId)
    console.log(clientSecret)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: `${clientId}`,
            client_secret: `${clientSecret}`,
            audience: 'https://kettleon.kinde.com/api'
        })
    };

    const response = await fetch(url, options);
    console.log(options)
    const data = await response.json();
    console.log(data)
    console.log("token", data.access_token)
    return data.access_token;
}

export const addUser = async (e : any, props: any) => {
e.preventDefault();

const accessToken = await getAccessToken()
const authString = "Bearer " + accessToken
console.log(authString)
console.log(props)
const inputBody = {
    profile: {
      given_name: e.target.given_name.value,
      family_name: e.target.family_name.value,
    },
    organization_code: props.organisation,
    identities: [
      {
        type: "email",
        details: {
          email: e.target.email.value
        }
      }
    ]
  };
  console.log(inputBody)

  const headers = {
    // Content-Type:'application/json',
    Accept: "application/json",
    Authorization: authString,
    audience: "https://kettleon.kinde.com/api"
  };
  
//   await fetch('https://kettleon.kinde.com/api/v1/user',
//   {
//     method: 'POST',
//     body: JSON.stringify(inputBody),
//     headers: headers
//   })
//   .then(function(res) {
//       return res.json();
//   }).then(function(body) {
//       console.log(body);
//   });

  const dbInputBody = {
    email: e.target.email.value,
    username: e.target.given_name.value + " " + e.target.family_name.value,
    team: props.organisation,
    company: e.target.company.value,
    role: e.target.role.value,
    image: "",
    bio: "",
    prompt: "",
    answer: ""
  }


  await fetch("/api/trpc/addUser",
  {
    method: 'POST',
    body: JSON.stringify(dbInputBody),
  })
  .then(function(res) {
      return res.json();
  }).then(function(body) {
      console.log(body);
  });
  
}


