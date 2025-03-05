import React from 'react'

const AddCategoryForm = () => {
  return (
    <>
      <div className="m-6" >
        <h1 className="text-2xl font-bold text-center" >add cateogry</h1>
        <form action="">
        <div>
            <input type="text"
            name="categoryName"
            className="m-6"
            />
        </div>
        <div>
            <input type="text"
            name="categoryDescription"
            className="m-6"
            />
        </div>
        <button type="submit" className="m-6"></button>
        </form>
      </div>
    </>
  )
}

export default AddCategoryForm
