const Notification = ({ notification }) => {
  // const notification = useSelector((state) => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  if (!notification) {
    return
  }

  return <div style={style}>{notification}</div>
}

export default Notification
