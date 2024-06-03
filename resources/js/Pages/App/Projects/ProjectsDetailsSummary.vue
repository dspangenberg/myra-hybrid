<template>
  <div class="flex space-x-6 mb-3">
    <stormy-shadow-box class="flex-shrink-1 content-between max-h-fit w-2/3">
      <div class="px-6 py-6 mb-2">
        <ul
          role="list"
          class="space-y-8"
        >
          <li
            v-for="comment in comments"
            :key="comment.id"
          >
            <div class="flex space-x-3">
              <div class="flex-shrink-0">
                <img
                  class="h-10 w-10 rounded-full"
                  :src="`https://images.unsplash.com/photo-${comment.imageId}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`"
                  alt=""
                >
              </div>
              <div>
                <div class="text-sm">
                  <a
                    href="#"
                    class="font-medium text-gray-900"
                  >{{ comment.name }}</a>
                </div>
                <div class="mt-1 text-sm text-gray-700 leading-normal">
                  <p>{{ comment.body }}</p>
                </div>
                <li class="mt-2 text-sm space-x-2">
                  <span class="text-gray-500 font-medium">{{ comment.date }}</span>
                  {{ ' ' }}
                  <span class="text-gray-500 font-medium">&middot;</span>
                  {{ ' ' }}
                  <button
                    type="button"
                    class="text-gray-900 font-medium"
                  >
                    Reply
                  </button>
                </li>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </stormy-shadow-box>
    <div class="flex-1 w-1/3 mt-10">
      <ProjectsDetailsSummarySide :project="project" />
    </div>
  </div>
</template>
<script setup>
import ProjectsDetailsSummarySide from './ProjectsDetailsSummarySide.vue'

defineProps({
  project: {
    type: Object,
    default: () => {}
  }
})

const comments = [
  {
    id: 1,
    name: 'Leslie Alexander',
    date: '4d ago',
    imageId: '1494790108377-be9c29b29330',
    body:
      'Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.'
  },
  {
    id: 2,
    name: 'Michael Foster',
    date: '4d ago',
    imageId: '1519244703995-f4e0f30006d5',
    body:
      'Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.'
  },
  {
    id: 3,
    name: 'Dries Vincent',
    date: '4d ago',
    imageId: '1506794778202-cad84cf45f1d',
    body:
      'Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.'
  }
]
</script>
