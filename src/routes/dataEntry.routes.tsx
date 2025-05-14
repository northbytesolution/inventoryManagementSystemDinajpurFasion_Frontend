
import Attributes from "@/pages/dashboard/DataEntry/Attributes";
import Brand from "@/pages/dashboard/DataEntry/Brand";
import Category from "@/pages/dashboard/DataEntry/Category";
import Location from "@/pages/dashboard/DataEntry/Location";
import Tag from "@/pages/dashboard/DataEntry/Tag";


export const dataEntryPaths = [

  {
    name: 'Category',
    path: '/category',
    element: <Category/>,
  },
  {
    name: 'Attributes',
    path: '/attributes',
    element: <Attributes/>,
  },
  {
    name: 'Brand',
    path: '/brand',
    element: <Brand/>,
  },
  {
    name: 'Tag',
    path: '/tag',
    element: <Tag/>,
  },
  {
    name: 'Tag',
    path: '/location',
    element: <Location/>,
  },



];

