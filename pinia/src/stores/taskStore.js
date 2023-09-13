import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
    state() {
        return {
            tasks: [],
            loading: false
        }
    },
    getters: {
        favoriteTasks() {
            return this.tasks.filter(task => task.isFav)
        },
        favoriteTaskCount() {
            return this.favoriteTasks.length
        },
        totalTaskCount() {
            return this.tasks.length
        }
    },
    actions: {
        getTasks() {
            this.loading = true
            fetch(`http://localhost:3000/tasks`)
                .then(res => res.json())
                .then(data => this.tasks = data)
                .catch(err => console.error(err))
                .finally(() => this.loading = false)
        },
        deleteTask(id) {
            this.tasks = this.tasks.filter(task => task.id !== id)
            fetch(`http://localhost:3000/tasks/${id}`, {
                method: 'DELETE',
            })
                .catch(err => console.error(err))
        },
        addTask(task) {
            this.tasks.push(task)
            fetch(`http://localhost:3000/tasks`, {
                method: 'POST',
                body: JSON.stringify(task),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .catch(err => console.error(err))
        },
        toggleFavoriteTask(id) {
            const task = this.tasks.find(task => task.id === id)
            task.isFav = !task.isFav
            fetch(`http://localhost:3000/tasks/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ isFav: task.isFav }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .catch(err => console.error(err))
        }
    }
})
