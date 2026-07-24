const axios = require("axios");
const supabase =
require("../config/supabase");

// Get all API configurations
exports.getAllAPIs =
async(req, res) => {

  try {

    const { data: apis, error } = await supabase
      .from("third_party_apis")
      .select("*")
      .order("api_name");

    if (error) {
      return res.status(400).json(error);
    }

    // Get credentials for each API
    const apisWithCredentials = await Promise.all(
      (apis || []).map(async (api) => {
        const { data: credentials } = await supabase
          .from("api_credentials")
          .select("*")
          .eq("api_id", api.id);

        return {
          ...api,
          credentials: credentials || []
        };
      })
    );

    res.json(apisWithCredentials);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

};

// Get single API configuration
exports.getAPIById =
async(req, res) => {

  try {

    const { id } = req.params;

    const { data: api, error } = await supabase
      .from("third_party_apis")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(400).json(error);
    }

    const { data: credentials } = await supabase
      .from("api_credentials")
      .select("*")
      .eq("api_id", id);

    res.json({
      ...api,
      credentials: credentials || []
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

};

// Create new API configuration
exports.createAPI =
async(req, res) => {

  try {

    const {
  api_name,
  description,
  base_url,
  test_url,
  auth_type,
  request_method,
  projects_endpoint,
  responses_endpoint,
  response_path,
  id_field,
  name_field,
  auth_header,
  auth_query_param,
  credentials
} = req.body;

    // Insert API
   const { data: api, error: apiError } = await supabase
  .from("third_party_apis")
  .insert([{
    api_name,
    description,
    base_url,
    test_url,
    auth_type,
    request_method,
    is_enabled: false
  }])
  .select()
  .single();

    if (apiError) {
      return res.status(400).json(apiError);
    }
// const { data: existing } = await supabase
//   .from("third_party_apis")
//   .select("id")
//   .eq("api_name", api_name)
//   .maybeSingle();

// if (existing) {
//   return res.status(400).json({
//     success: false,
//     message: "API already exists"
//   });
// }
    // Insert credentials if provided
    if (credentials && credentials.length > 0) {
      const credentialsWithApiId = credentials.map(cred => ({
        api_id: api.id,
        credential_key: cred.credential_key,
        credential_value: cred.credential_value,
        is_secret: cred.is_secret || false
      }));

      const { data: credsData, error: credsError } = await supabase
        .from("api_credentials")
        .insert(credentialsWithApiId)
        .select();

      if (credsError) {
        console.log(credsError);
      }
    }

    res.json({
      ...api,
      credentials: credentials || []
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

};

// Update API configuration
exports.updateAPI =
async(req, res) => {

  try {

    const { id } = req.params;
   const {
  api_name,
  description,
  base_url,
  test_url,
  auth_type,
  request_method,
  is_enabled,
  credentials
} = req.body;

    // Update API
    const { data: api, error: apiError } = await supabase
      .from("third_party_apis")
     .update({
  api_name,
  description,
  base_url,
  test_url,
  auth_type,
  request_method,
  is_enabled,
  updated_at: new Date().toISOString()
})
      .eq("id", id)
      .select()
      .single();

    if (apiError) {
      return res.status(400).json(apiError);
    }

    // Delete old credentials
    await supabase
      .from("api_credentials")
      .delete()
      .eq("api_id", id);

    // Insert new credentials
    if (credentials && credentials.length > 0) {
      const credentialsWithApiId = credentials.map(cred => ({
        api_id: id,
        credential_key: cred.credential_key,
        credential_value: cred.credential_value,
        is_secret: cred.is_secret || false
      }));

      await supabase
        .from("api_credentials")
        .insert(credentialsWithApiId);
    }

    // Fetch updated credentials
    const { data: updatedCreds } = await supabase
      .from("api_credentials")
      .select("*")
      .eq("api_id", id);

    res.json({
      ...api,
      credentials: updatedCreds || []
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

};

// Toggle API status
exports.toggleAPI =
async(req, res) => {

  try {

    const { id } = req.params;
    const { is_enabled } = req.body;

    const { data: api, error } = await supabase
      .from("third_party_apis")
      .update({
        is_enabled,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(400).json(error);
    }

    res.json(api);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

};

// Delete API configuration
exports.deleteAPI =
async(req, res) => {

  try {

    const { id } = req.params;

    // Delete credentials first
    await supabase
      .from("api_credentials")
      .delete()
      .eq("api_id", id);

    // Delete API
    await supabase
      .from("third_party_apis")
      .delete()
      .eq("id", id);

    res.json({
      success: true,
      message: "API configuration deleted"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

};

// Test API connection
exports.testAPI = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: api, error } = await supabase
      .from("third_party_apis")
      .select("*")
      .eq("id", id)
      .single();

//       if (!api.is_enabled) {
//   return res.status(400).json({
//     success: false,
//     message: "API is disabled"
//   });
// }
    if (error || !api) {
      return res.status(404).json({
        success: false,
        message: "API not found"
      });
    }

    const { data: credentials } = await supabase
      .from("api_credentials")
      .select("*")
      .eq("api_id", id);

    const creds = {};

    (credentials || []).forEach((c) => {
      creds[c.credential_key] = c.credential_value;
    });

    let headers = {};
    console.log("AUTH TYPE:", api.auth_type);
console.log("CREDS:", creds);

    switch ((api.auth_type || "").toLowerCase()) {
      case "bearer":
        headers.Authorization = `Bearer ${creds.api_key}`;
        break;

      case "apikey":
        headers["APIKEY"] = creds.api_key;
        break;

      case "basic":
        headers.Authorization =
          "Basic " +
          Buffer.from(
            `${creds.username}:${creds.password}`
          ).toString("base64");
        break;
    }

  //   const response = await axios({
  //     method: api.request_method || "GET",
  //     url: api.test_url,
  //     headers,
  //     params: {
  //   apiKey: creds.api_key
  // },
  //     timeout: 10000
  //   });

  const response = await makeRequest(
  api,
  creds,
  api.test_url.replace(api.base_url, ""),
  api.request_method
);

    return res.json({
      success: true,
      message: `${api.api_name} connection successful`,
      status: response.status
    });

  } catch (err) {

    console.log(err);

    return res.status(400).json({
      success: false,
      message: "Connection failed",
      error: err.response?.data || err.message
    });

  }
};



async function makeRequest(api, creds, endpoint, method = "GET", body = null) {
    const headers = {};
    const params = {};

    switch ((api.auth_type || "").toLowerCase()) {

        case "bearer":
            headers.Authorization = `Bearer ${creds.api_key}`;
            break;

        case "apikey":
            if (api.auth_header) {
                headers[api.auth_header] = creds.api_key;
            } else {
                params.apiKey = creds.api_key;
            }
            break;

        case "basic":
            headers.Authorization =
                "Basic " +
                Buffer.from(
                    `${creds.username}:${creds.password}`
                ).toString("base64");
            break;
    }

    const url = endpoint.startsWith("http")
        ? endpoint
        : `${api.base_url}${endpoint}`;

    const response = await axios({
        method,
        url,
        headers,
        params,
        data: body,
        timeout: 10000
    });

    return response.data;
}

exports.syncAPI = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: api } = await supabase
      .from("third_party_apis")
      .select("*")
      .eq("id", id)
      .single();

    if (!api) {
      return res.status(404).json({
        success: false,
        message: "API not found"
      });
    }

    const { data: credentials } = await supabase
      .from("api_credentials")
      .select("*")
      .eq("api_id", id);

    const creds = {};

    (credentials || []).forEach((c) => {
      creds[c.credential_key] = c.credential_value;
    });

    const result = await makeRequest(
      api,
      creds,
      api.test_url.replace(api.base_url, ""),
      api.request_method
    );

    await supabase
      .from("third_party_apis")
      .update({
        last_sync: new Date().toISOString(),
        projects: result.projects || 0,
        respondents: result.respondents || 0
      })
      .eq("id", id);

    return res.json({
      success: true,
      data: result
    });

  } catch (err) {

    console.log(err);

    return res.status(400).json({
      success: false,
      message: "Synchronization completed",
      data: result
    });

  }
};