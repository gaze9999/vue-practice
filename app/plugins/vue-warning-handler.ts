export default defineNuxtPlugin((nuxtApp) => {
  // 在開發環境中過濾掉來自開發工具的警告
  if (process.dev) {
    const originalWarn = console.warn;
    console.warn = (...args: any[]) => {
      const message = args[0];

      // 過濾掉 VueElement 屬性繼承警告（來自 Vue DevTools）
      if (
        typeof message === 'string' &&
        message.includes('Extraneous non-props attributes') &&
        message.includes('VueElement')
      ) {
        return;
      }

      // 其他警告正常顯示
      originalWarn.apply(console, args);
    };
  }
});
