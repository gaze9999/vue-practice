<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white border-b border-gray-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-8 py-4 flex items-center gap-6">
        <NuxtLink to="/projects" class="text-gray-500 hover:text-gray-900 text-sm transition-colors">
          ← 返回專案
        </NuxtLink>
        <h1 class="text-2xl font-semibold text-gray-900">商城展示</h1>
      </div>
    </header>
    <main class="max-w-7xl mx-auto px-8 py-8">
      <slot />
    </main>
  </div>
</template>
