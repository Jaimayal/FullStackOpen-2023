// import { Link } from 'react-router-dom'
import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Link } from 'react-router-dom'
export default function Users({ users }) {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 250, marginY: 3 }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Blogs added</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </TableCell>
              <TableCell align="left">{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
// function Users({ users }) {
//   if (!users) {
//     return <p>Loading...</p>
//   }

//   return (
//     <>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Blogs</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
//               <td>{user.blogs.length}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   )
// }

// export default Users
