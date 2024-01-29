import Costumers from '../../admin/Costumers'

const AdminContainer = () => {
  window.onload = () => {
		window.scrollTo(0, 0)
	}

  return (
    <main>
      <Costumers />
    </main>
  )
}

export default AdminContainer