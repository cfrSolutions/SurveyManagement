import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import MainLayout from "../../components/layout/MainLayout";

import "../../styles/module.css";

function ClientList() {

  const navigate = useNavigate();

  const [clients, setClients] =
    useState([]);

  useEffect(() => {

    loadClients();

  }, []);

  const loadClients = async () => {

    try {

      const res =
        await api.get("/clients");

      setClients(
        res.data || []
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <MainLayout>

      <div className="module-page">

        <div className="module-header">

          <h1 className="module-title">
            Clients
          </h1>

          <button
            className="primary-btn"
            onClick={() =>
              navigate("/clients/create")
            }
          >
            Create Client
          </button>

        </div>

        <div className="table-card">

          <table
            className="enterprise-table"
          >

            <thead>
<tr>
  <th>Edit</th>
  <th>ID</th>
  <th>Company Name</th>
  <th>Company Email ID</th>
  <th>Phone Number</th>
  <th>Country</th>
  <th>Contact Name</th>
  <th>Company Type</th>
  <th>Is Active</th>
</tr>
</thead>

<tbody>

{clients.length > 0 ? (

clients.map((client)=>(

<tr key={client.id}>

<td>

<button
className="table-edit-btn"
onClick={() =>
navigate(`/clients/${client.id}`)
}
>
Edit
</button>

</td>

<td>{client.id}</td>

<td>{client.company_name}</td>

<td>{client.email}</td>

<td>{client.phone}</td>

<td>{client.country}</td>

<td>
{client.primary_contact_name || "-"}
</td>

<td>Client</td>

<td>
<span className="active-badge">
True
</span>
</td>

</tr>

))

) : (

<tr>
<td colSpan="9">
No Clients Found
</td>
</tr>

)}

</tbody>

          </table>

        </div>

      </div>

    </MainLayout>

  );

}

export default ClientList;