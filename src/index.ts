import { ref, Ref, onUnmounted } from '@vue/composition-api';

const useWorker = (fn: Function): Function[] => {
  const newWorker: Ref<any> = ref();
  const fnStringifyed: string = fn.toString();
  const functionStart = 'function ';
  const functionName = fnStringifyed.slice(
    fnStringifyed.indexOf(functionStart) + functionStart.length,
    fnStringifyed.indexOf('(')
  );
  window.URL = window.URL || window.webkitURL;

  const generateWorker = (jobRunner: string, fnArgs: any) => {
    const response = ` ${fnArgs.toString()};
							onmessage=function({data}){
								postMessage(${jobRunner}(...data));
							}`;
    const blob = new Blob([response], { type: 'application/javascript' });
    return new Worker(URL.createObjectURL(blob));
  };

  const killWorker = () => {
    if (newWorker.value) {
      newWorker.value.terminate();
      URL.revokeObjectURL(newWorker.value._url);
      newWorker.value = null;
    }
  };

  const callWorker = (...deps: any[]) =>
    new Promise((resolve, reject) => {
      newWorker.value.onmessage = (e: MessageEvent) => {
        resolve(e.data);
      };
      newWorker.value.onerror = (e: ErrorEvent) => {
        reject(e);
      };
      newWorker.value.postMessage(...deps);
    });

  const workerHook = (...fnArgs: any): Promise<any> => {
    newWorker.value = generateWorker(functionName, fn);
    return callWorker([...fnArgs]);
  };
  
  onUnmounted(killWorker);

  return [workerHook, killWorker];
};

export default useWorker;
