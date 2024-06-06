import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

const Add_categories = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [category, setCategory] = useState([]);

    useEffect(() => {
        info_category();
    }, []);

    async function info_category() {
        try {
            let res = await fetch("http://127.0.0.1:8000/api/info_categories");
            let data = await res.json();
            setCategory(data);
        } catch (error) {
            console.error('Failed to fetch categorys:', error);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('name', name);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/add_categories', {
              method: 'POST',
              body: formData,
            });
      
            if (response.ok) {
              const result = await response.json();
              setMessage('category added! successfully'); // Set a success message

              setTimeout(() => {
                setMessage(''); // Clear the message after 5 seconds
              }, 5000);
              console.log(result);
              info_category();
            } else {
              throw new Error('Failed to upload');
            }
          } catch (error) {
            setMessage(error.message);
            console.error('Error during the upload:', error);
          }

    }

    async function deleteCategory(id) {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/delete_categorie/${id}`, { method: 'DELETE' });
          if (response.ok) {
            setMessage('Category deleted successfully.');

            setTimeout(() => {
              setMessage(''); // Clear the message after 5 seconds
            }, 5000);
            info_category(); // Refresh the list on successful delete
          } else {
            console.error('Failed to delete Category:', response.status);
          }
        } catch (error) {
          console.error('Error deleting Category:', error);
        }
    }
  return (
    <>
            <header className="navbar">
                <div className="container">
                    <div className="nav-wrapper grid p-2">
                        <div className="flex justify-between items-center">
                            <img src="../assets/images/logo.png" alt="Logo" />
                        </div>
                    </div>
                </div>
            </header>
            <div style={styles.container}>
    <h1 style={styles.heading}>Add Categories</h1>
    <form onSubmit={handleSubmit} style={styles.form}>
      <label>
        Name:
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
      </label>
      <button type="submit" style={styles.button}>Submit</button>
    </form>
    {message && <p style={styles.message}>{message}</p>}

    <table style={styles.table}>
      <thead>
        <tr>
          {["Name", "Actions"].map(header => (
            <th key={header} style={styles.th}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {category.map((Category) => (
          <tr key={Category.id}>
            <td style={styles.td}>{Category.name}</td>
            <td style={styles.td}>
              <button onClick={() => deleteCategory(Category.id)} style={styles.buttonDelete}>
                Delete Category
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
    </>
  )
}

const styles = {
  container: {
    margin: '-80px  auto',
    width: '80%',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    color: '#333',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
    alignItems: 'center'
  },
  input: {
    padding: '8px',
    margin: '0 10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '300px'
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#800080',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px'
  },
  buttonDelete: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#FF0000', // Purple color
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px'
  },
  message: {
    color: 'red',
    textAlign: 'center',
    margin: '10px 0'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px'
  },
  th: {
    backgroundColor: '#f0f0f0',
    padding: '10px',
    border: '1px solid #ddd'
  },
  td: {
    textAlign: 'center',
    padding: '10px',
    border: '1px solid #ddd'
  }
};
export default Add_categories
