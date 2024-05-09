import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Sidebar from '../components/sidebar';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: '3px solid #000',
  boxShadow: 24,
  p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  [`& .add-icon:hover`]: {
    color: '#00cc00',
  },

  [`& .delete-icon:hover`]: {
    color: '#ff0000',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function Products() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false);setImage(null);}
  const [editOpen, setEditOpen] = React.useState(false);
  const [editProduct, setEditProduct] = React.useState(null);

  useEffect(() => { fetchData() }, [])

  const [data, setData] = useState([])
  const fetchData = async () => {
    try {
      const resp = await axios.get('http://localhost:8081/productstable')
      setData(resp.data)
      console.log(resp);
    } catch (error) {
      console.log(error);
    }

  }

  const [values, setValues] = useState({
    title: '',
    description: '',
    category: '',
    price: ''
  })

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: [event.target.value] })
  }

  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('category', values.category);
    formData.append('price', values.price);
    formData.append('image', image);

    try {
      await axios.post('http://localhost:8081/addproduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Product added successfully');
      toast.success('Product added successful');
      handleClose();
      setImage(null);
      fetchData();
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Error adding product !');
      setImage(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete('http://localhost:8081/deleteproduct/' + id)
      toast.success('Product deleted successful');
      fetchData();
    }
    catch (err) {
      console.log(err);
      toast.error('Error deleting product !');
    }

  };

  const handleEditOpen = (product) => {
    setEditProduct(product);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditProduct(null);
    setEditOpen(false);
  };


  const handleEditSubmit = async (event) => {
    event.preventDefault();
  
    const updatedProduct = {
      title: values.title,
      description: values.description,
      category: values.category,
      price: values.price,
    };
  
    try {
      await axios.put(`http://localhost:8081/updateproduct/${editProduct.p_id}`, updatedProduct);
  
      console.log('Product updated successfully');
      toast.success('Product updated successfully');
      handleEditClose();
      fetchData();
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Error updating product !');
    }
  };

  return (
    <div>
      <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

      <Box height={70} />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div className='buttonAdd'>
            <Button variant="contained" startIcon={<AddIcon />} sx={{ backgroundColor: '#2f2f2f', padding: 1.5 }} onClick={handleOpen}>
              Add Product
            </Button>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <DialogTitle id="modal-modal-title" sx={{ textAlign: 'center' }}>Add Product</DialogTitle>
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      id="title"
                      label="Product Title"
                      name="title"
                      fullWidth
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="description"
                      label="Product Description"
                      name="description"
                      fullWidth
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="category"
                      label="Product Category"
                      name="category"
                      fullWidth
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="price"
                      label="Product Price"
                      name="price"
                      fullWidth
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <input
                      accept="image/*"
                      id="image"
                      name="image"
                      type="file"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="image">
                      <Button
                        component="image"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        sx={{width: '100%'}}
                      >
                        Upload file
                        <VisuallyHiddenInput type="file" />
                      </Button>
                    </label>
                  </Grid>

                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button onClick={handleClose} variant="contained"
                      sx={{
                        mt: 2, width: '100%',
                        backgroundColor: theme => theme.palette.error.main,
                        '&:hover': { backgroundColor: '#ff0000' }
                      }}>
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button type="submit" variant="contained"
                      sx={{
                        mt: 2, width: '100%',
                        backgroundColor: theme => theme.palette.success.main,
                        '&:hover': { backgroundColor: '#00cc00' }
                      }}>
                      Add Product
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Modal>

          <Modal
            open={editOpen}
            onClose={handleEditClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <DialogTitle id="modal-modal-title" sx={{ textAlign: 'center' }}>Edit Product</DialogTitle>
              <form noValidate onSubmit={handleEditSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      id="title"
                      label="Product Title"
                      name="title"
                      fullWidth
                      defaultValue={editProduct ? editProduct.title : ''}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="description"
                      label="Product Description"
                      name="description"
                      fullWidth
                      defaultValue={editProduct ? editProduct.description : ''}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="category"
                      label="Product Category"
                      name="category"
                      fullWidth
                      defaultValue={editProduct ? editProduct.category : ''}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="price"
                      label="Product Price"
                      name="price"
                      fullWidth
                      defaultValue={editProduct ? editProduct.price : ''}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button onClick={handleEditClose} variant="contained"
                      sx={{
                        mt: 3, width: '100%',
                        backgroundColor: theme => theme.palette.error.main,
                        '&:hover': { backgroundColor: '#ff0000' }
                      }}>
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button type="submit" variant="contained"
                      sx={{
                        mt: 3, width: '100%',
                        backgroundColor: theme => theme.palette.success.main,
                        '&:hover': { backgroundColor: '#00cc00' }
                      }}>
                      Save Changes
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Modal>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                <StyledTableCell align="center">Serial Number</StyledTableCell>
                  <StyledTableCell align="center">Image</StyledTableCell>
                  <StyledTableCell align="center">Product Name</StyledTableCell>
                  <StyledTableCell align="center">Product Description</StyledTableCell>
                  <StyledTableCell align="center">Category</StyledTableCell>
                  <StyledTableCell align="center">Price</StyledTableCell>
                  <StyledTableCell align="center">Edit</StyledTableCell>
                  <StyledTableCell align="center">Delete</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((d, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell align="center">{i + 1}</StyledTableCell>
                    <StyledTableCell align="center">
                      {d.image && <img src={`http://localhost:8081/images/${d.image}`} alt="Product Image" style={{ width: '70px', height: '70px' }} />}
                    </StyledTableCell>
                    <StyledTableCell align="center">{d.title}</StyledTableCell>
                    <StyledTableCell align="center">{d.description}</StyledTableCell>
                    <StyledTableCell align="center">{d.category}</StyledTableCell>
                    <StyledTableCell align="center">₹{d.price}</StyledTableCell>
                    <StyledTableCell align="center"><IconButton aria-label="delete" onClick={() => handleEditOpen(d)}>
                      <EditIcon className="add-icon" />
                    </IconButton></StyledTableCell>
                    <StyledTableCell align="center"><IconButton aria-label="delete" onClick={e => handleDelete(d.p_id)}>
                      <DeleteIcon className="delete-icon" />
                    </IconButton></StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </div>
  )
}

export default Products;
