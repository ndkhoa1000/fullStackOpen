const Notification = ({ status,content }) => {
    if (content === null) {
      return null
    }
    return (
      <div className={status}>
        {content}
      </div>
    )
  }

export default Notification