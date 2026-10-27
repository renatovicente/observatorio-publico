// Visibility follows the latest documented outcome. Display colors come from severity.
export const statusOverrides = {
  'chico-buarque': {
    tone:'closed',
    status:{pt:'Condenação reformada em recurso',en:'Civil judgment reversed on appeal'}
  }
};

export function caseDisposition(record){
  if(statusOverrides[record.id])return statusOverrides[record.id].tone;
  if(record.state==='encerrado')return 'closed';
  if(record.state==='pedido')return 'pending';
  if(record.state==='investigacao'||record.state==='decisao')return 'open';
  return 'pending';
}

export const countedCases = records => records.filter(record=>caseDisposition(record)==='open');
