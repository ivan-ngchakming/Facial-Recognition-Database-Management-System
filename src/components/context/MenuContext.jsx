import { createContext, useState } from "react"
import { Menu, MenuItem } from "@material-ui/core"

//context-menu context
export const ContextMenuContext = createContext({ openPopOver: () => {} })

// context provider wrapper for the drop down
export const ContextMenuProvider = ({ children, options }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [open, setOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(undefined)
  const handleClose = () => {
    setOpen((value) => !value)
  }
  const openPopOver = (top, left, image) => {
    setPosition((value) => ({ ...value, top, left }))
    setSelectedImage(image)
    setOpen((value) => !value)
  }
  const handleContextMenu = (e) => {
    setOpen((value) => !value)
    e.preventDefault()
  }

  const handleAction = (action) => {
    return () => {
      action(selectedImage)
      handleClose()
    }
  }

  return (
    <ContextMenuContext.Provider value={{ openPopOver }}>
      {children}
      <div onContextMenu={handleContextMenu}>
        <Menu
          anchorReference="anchorPosition"
          anchorPosition={position}
          open={open}
          onClose={handleClose}
        >
          {options?.length
            ? options?.map((option, idx) => (
                <MenuItem onClick={handleAction(option.action)}>
                  {option.renderName(selectedImage)}
                </MenuItem>
              ))
            : null}
        </Menu>
      </div>
    </ContextMenuContext.Provider>
  )
}
