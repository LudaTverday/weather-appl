export function getminMaxDate () {
    const currentDate = new Date();
   const minDay = currentDate.toISOString().substring(0,10);
   const day = currentDate.getDate();
   currentDate.setDate(day + 17);
   const maxDay = currentDate.toISOString().substring(0,10);
   const objMinMaxDay = {
      minDay: minDay,
      maxDay: maxDay 
   }
   return objMinMaxDay;
}