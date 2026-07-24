import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "../pages/auth/Login";

import Dashboard from "../pages/dashboard/Dashboard";
import ClientDashboard from "../pages/dashboard/ClientDashboard";
import VendorDashboard from "../pages/dashboard/VendorDashboard";

import ClientList from "../pages/clients/ClientList";
import CreateClient from "../pages/clients/CreateClient";
import ClientDetails from "../pages/clients/ClientDetails";
import ClientContacts from "../pages/clients/ClientContacts";

import VendorList from "../pages/vendors/VendorList";
import CreateVendor from "../pages/vendors/CreateVendor";
import VendorContacts from "../pages/vendors/VendorContacts";
import VendorDetails from "../pages/vendors/VendorDetails";

import EmployeeList from "../pages/employees/EmployeeList";
import CreateEmployee from "../pages/employees/CreateEmployee";
import EmployeeDetails from "../pages/employees/EmployeeDetails";
// import Permissions from "../pages/employees/Permissions";

import ProjectList from "../pages/projects/ProjectList";
import CreateProject from "../pages/projects/CreateProject";
import VendorAllocation from "../pages/projects/VendorAllocation";
import ProjectView from "../pages/projects/ProjectView";
import ActivityLogs from "../pages/Administration/ActivityLogs";

// import Tracking from "../pages/projects/Tracking";
import ManageProject from "../pages/projects/ManageProject";

import ManageVendorContact
from "../pages/vendors/ManageVendorContact";

import ManageClientContact
from "../pages/clients/ManageClientContact";

import UserManagement from "../pages/Administration/UserManagement";

// import Administration from "../pages/Administration/Administration";
import Reports from "../pages/reports/Reports";

import Settings from "../pages/settings/Settings";
import ThirdPartyAPIs from "../pages/settings/ThirdPartyAPIs";
import Roles from "../pages/admin/Roles";
import ThankYouPages from "../pages/thank-you/ThankYouPages";
import ThankYou from "../pages/public/ThankYou";
import EditThankYouPage from "../pages/thank-you/EditThankYouPage";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/client-dashboard"
          element={
            <ProtectedRoute>
              <ClientDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor-dashboard"
          element={
            <ProtectedRoute>
              <VendorDashboard />
            </ProtectedRoute>
          }
        />

        {/* CLIENTS */}

        <Route
          path="/clients"
          element={
            <ProtectedRoute>
              <ClientList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/clients/create"
          element={
            <ProtectedRoute>
              <CreateClient />
            </ProtectedRoute>
          }
        />

        <Route
          path="/clients/:id"
          element={
            <ProtectedRoute>
              <ClientDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/clients/:id/contacts"
          element={
            <ProtectedRoute>
              <ClientContacts />
            </ProtectedRoute>
          }
        />

        <Route
  path="/clients/:clientId/contacts/:contactId"
  element={
    <ProtectedRoute>
      <ManageClientContact />
    </ProtectedRoute>
  }
/>

        {/* VENDORS */}

        <Route
          path="/vendors"
          element={
            <ProtectedRoute>
              <VendorList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendors/create"
          element={
            <ProtectedRoute>
              <CreateVendor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendors/:id/contacts"
          element={
            <ProtectedRoute>
              <VendorContacts />
            </ProtectedRoute>
          }
        />

        <Route
  path="/vendors/:id"
  element={
    <ProtectedRoute>
      <VendorDetails />
    </ProtectedRoute>
  }
/>

<Route
  path="/vendors/:vendorId/contacts/:contactId"
  element={
    <ProtectedRoute>
      <ManageVendorContact />
    </ProtectedRoute>
  }
/>


        {/* EMPLOYEES */}

        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <EmployeeList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees/create"
          element={
            <ProtectedRoute>
              <CreateEmployee />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees/edit/:id"
          element={
            <ProtectedRoute>
              <CreateEmployee />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees/:id"
          element={
            <ProtectedRoute>
              <EmployeeDetails />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/employees/permissions"
          element={
            <ProtectedRoute>
              <Permissions />
            </ProtectedRoute>
          }
        /> */}

        {/* PROJECTS */}

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <ProjectList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/create"
          element={
            <ProtectedRoute>
              <CreateProject />
            </ProtectedRoute>
          }
        />

        <Route
  path="/projects/view/:id"
  element={
    <ProtectedRoute>
      <ProjectView />
    </ProtectedRoute>
  }
/>

        <Route
  path="/projects/:id"
  element={
    <ProtectedRoute>
      <ManageProject />
    </ProtectedRoute>
  }
/>

        <Route
          path="/projects/vendor-allocation"
          element={
            <ProtectedRoute>
              <VendorAllocation />
            </ProtectedRoute>
          }
        />

        <Route
  path="/projects/:projectId/vendors/add"
  element={
    <ProtectedRoute>
      <VendorAllocation />
    </ProtectedRoute>
  }
/>

        {/* <Route
          path="/projects/survey-links"
          element={
            <ProtectedRoute>
              <SurveyLinks />
            </ProtectedRoute>
          }
        /> */}

        {/* <Route
          path="/projects/tracking"
          element={
            <ProtectedRoute>
              <Tracking />
            </ProtectedRoute>
          }
        /> */}

        {/* REPORTS */}

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

{/* <Route
  path="/administration"
  element={<Administration />}
/>
       <Route
  path="/administration"
  element={
    <ProtectedRoute>
      <Administration />
    </ProtectedRoute>
  }
/> */}
<Route
  path="/administration/users"
  element={
    <ProtectedRoute>
      <UserManagement />
    </ProtectedRoute>
  }
/>

<Route
  path="/administration/roles"
  element={
    <ProtectedRoute>
      <Roles />
    </ProtectedRoute>
  }
/>

<Route
  path="/administration/activity-logs"
  element={
    <ProtectedRoute>
      <ActivityLogs />
    </ProtectedRoute>
  }
/>
        {/* SETTINGS */}

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings/third-party-apis"
          element={
            <ProtectedRoute>
              <ThirdPartyAPIs />
            </ProtectedRoute>
          }
        />
        <Route
      path="/thank-you-pages"
      element={
        <ProtectedRoute>
          <ThankYouPages />
        </ProtectedRoute>
      }
    />

    <Route
      path="/thank-you-pages/:projectId"
      element={
        <ProtectedRoute>
          <EditThankYouPage />
        </ProtectedRoute>
      }
    />
    <Route
    path="/thank-you/:projectId/:status"
    element={<ThankYou />}
/>

      </Routes>
      

    </BrowserRouter>
  );
}

export default AppRoutes;