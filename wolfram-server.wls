#!/usr/bin/wolframscript

xSocketServer[{host_,port_}] := Module[ {socket},
  socket = SocketOpen[{host,port},"ZMQ_REP"];
  SocketListen[socket,
    Function[{assoc},
      WriteString[$Output,"*"];
      BinaryWrite[assoc["SourceSocket"], ByteArray@ToCharacterCode[ToString[ToExpression@FromCharacterCode@Normal[assoc["DataByteArray"]]]]]
    ],
    HandlerFunctionsKeys -> {"Socket", "SourceSocket", "DataByteArray"}
  ];
]


xSocketServer[{"172.31.39.91","1234"}];

task = First @ AsynchronousTasks[];
Print["Ready..."];
WaitAsynchronousTask[task];
