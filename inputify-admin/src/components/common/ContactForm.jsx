import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

function ContactForm({
  formData,
  setFormData
}) {

  return (

    <div className="form-grid">

      <FormInput
        label="Contact Name"
        name="contact_name"
        value={formData.contact_name || ""}
        onChange={(e)=>
          setFormData({
            ...formData,
            contact_name:e.target.value
          })
        }
      />

      <FormSelect
        label="Gender"
        value={formData.gender || ""}
        onChange={(e)=>
          setFormData({
            ...formData,
            gender:e.target.value
          })
        }
        options={[
          {
            label:"Male",
            value:"Male"
          },
          {
            label:"Female",
            value:"Female"
          }
        ]}
      />

      <FormInput
        label="Email"
        name="email"
        value={formData.email || ""}
        onChange={(e)=>
          setFormData({
            ...formData,
            email:e.target.value
          })
        }
      />

      <FormInput
        label="Phone"
        name="phone"
        value={formData.phone || ""}
        onChange={(e)=>
          setFormData({
            ...formData,
            phone:e.target.value
          })
        }
      />

      <FormInput
        label="Job Title"
        name="title"
        value={formData.title || ""}
        onChange={(e)=>
          setFormData({
            ...formData,
            title:e.target.value
          })
        }
      />

    </div>

  );

}

export default ContactForm;