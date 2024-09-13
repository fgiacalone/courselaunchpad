function ltiLaunch(ltiUrl, key, secret, params) {
  const timestamp = Math.floor(Date.now() / 1000);
  const nonce = Math.random().toString(36).substring(2);

  params.oauth_consumer_key = key;
  params.oauth_nonce = nonce;
  params.oauth_signature_method = "HMAC-SHA1";
  params.oauth_timestamp = timestamp;
  params.oauth_version = "1.0";
  params.oauth_callback = "about:blank";

  // Sort the parameters lexicographically by key
  const sortedParams = {};
  Object.keys(params).sort().forEach((key) => {
    sortedParams[key] = params[key];
  });

  // Encode the LTI URL
  const encodedLtiUrl = encodeURIComponent(ltiUrl).replace(/%20/g, '+');

  // Function to generate the parameter string
  function generateParamString(params) {
    return Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
  }

  // Encode the sorted parameters
  const encodedParams = encodeURIComponent(generateParamString(sortedParams)).replace(/%20/g, '+');

  // Generate the base string
  const baseString = "POST&" + encodedLtiUrl + "&" + encodedParams;

  console.log("Base string:", baseString);

  // Generate the signature
  const signature = oauthSignature.generate("POST", ltiUrl, sortedParams, secret, null, { encodeSignature: false });
  console.log("Generated signature:", signature);

  params.oauth_signature = signature;

  // Create a form with the LTI parameters
  const form = document.createElement("form");
  form.setAttribute("method", "POST");
  form.setAttribute("action", ltiUrl);
  form.setAttribute("target", "scorm-content-iframe");

  for (const key in params) {
    const input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", key);
    input.setAttribute("value", params[key]);
    form.appendChild(input);
  }

  // Append the form to the body and submit it
  document.body.appendChild(form);
  console.log("form:", form);
  form.submit();
  document.body.removeChild(form);
}

function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Function to launch the content
function launch_content() {
  const ltiUrl = "https://app.cloud.scorm.com/sc/blti";
  
  // Retrieve key, secret, and user_id from URL parameters
  const key = getUrlParameter('key');       // SCORM DISPATCH KEY
  const secret = getUrlParameter('secret'); // SCORM DISPATCH SECRET
  const userId = getUrlParameter('user_id'); // User ID
  
  if (!key || !secret || !userId) {
    console.error("Key, secret, or user_id not provided in the URL.");
    return;
  }

  const params = {
    lti_message_type: "basic-lti-launch-request",
    lti_version: "LTI-1p0",
    resource_link_id: "xyz",                                             
    user_id: userId,          // Now using the user_id from the URL
    lis_person_name_given: "",
    lis_person_name_family: "",
    launch_presentation_document_target: "scorm-content-iframe",
    launch_presentation_document_target: "window"
  };

  ltiLaunch(ltiUrl, key, secret, params);
}

// Automatically launch the content once the webpage is loaded
window.onload = launch_content;
