

const Modal = ({isOpen,children,modalControl}) => {

  return (
<dialog className={`modal bg-base-100 text-base-content ${isOpen?"modal-open":null}`}>
  <div className="modal-box">
      <button onClick={()=>modalControl(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

    {children}

  </div>
</dialog>
  )
}

export default Modal