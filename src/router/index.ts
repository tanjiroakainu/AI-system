import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/pages/HomePage.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/pages/auth/RegisterPage.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/auth/LoginPage.vue')
    },
    {
      path: '/client/dashboard',
      name: 'ClientDashboard',
      component: () => import('@/client/pages/DashboardPage.vue'),
      meta: { requiresAuth: true, role: 'client' }
    },
    {
      path: '/admin/dashboard',
      name: 'AdminDashboard',
      component: () => import('@/admin/pages/DashboardPage.vue'),
      meta: { requiresAuth: true, role: 'admin' }
    }
  ]
})

router.beforeEach(async (to, _from, next) => {
  try {
    const authStore = useAuthStore()
    
    // Ensure auth store is initialized
    if (!authStore.user && localStorage.getItem('user')) {
      authStore.initialize()
    }
    
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      next('/login')
    } else if (to.meta.requiresAuth && authStore.user?.role !== to.meta.role) {
      if (authStore.user?.role === 'admin') {
        next('/admin/dashboard')
      } else {
        next('/client/dashboard')
      }
    } else if (to.path === '/login' && authStore.isAuthenticated) {
      if (authStore.user?.role === 'admin') {
        next('/admin/dashboard')
      } else {
        next('/client/dashboard')
      }
    } else if (to.path === '/register' && authStore.isAuthenticated && authStore.user?.role === 'client') {
      next('/client/dashboard')
    } else if (to.path === '/' && authStore.isAuthenticated) {
      if (authStore.user?.role === 'admin') {
        next('/admin/dashboard')
      } else {
        next('/client/dashboard')
      }
    } else {
      next()
    }
  } catch (error) {
    console.error('Router navigation error:', error)
    // Fallback to login on error
    if (to.path !== '/login') {
      next('/login')
    } else {
      next()
    }
  }
})

export default router

